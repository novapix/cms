<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();

        return Inertia::render('Images/Index', [
            'images' => $images,
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        $roleName = 'No role assigned';

        if ($user->roles()->exists()) {
            $roleName = $user->roles()->first()->name;
        }

        Log::info($roleName);

        return Inertia::render('Images/Create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();
        //        Log::info('Image upload request received.', [
        //            'user_id' => auth()->id(),
        //            'request_data' => $request->all(),
        //        ]);

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'url' => 'nullable|url',
                'alt_text' => 'nullable|string|max:255',
                'width' => 'nullable|integer|min:0',
                'height' => 'nullable|integer|min:0',
                'priority' => 'required|integer',
                'image' => 'nullable|image|max:2048', // Max 2MB for image upload
            ]);

            $image_url = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');

                Log::info('Image file detected, uploading to Cloudinary.', [
                    'image_name' => $image->getClientOriginalName(),
                ]);

                $uploadedImage = cloudinary()->upload($image->getRealPath(), [
                    'folder' => 'uploads',
                ]);
                $image_url = $uploadedImage->getSecurePath();

                Log::info('Image uploaded successfully to Cloudinary.', [
                    'image_url' => $image_url,
                ]);
            } elseif ($request->filled('url')) {
                $image_url = $request->input('url');
                Log::info('Using provided URL for image.', ['url' => $image_url]);
            }

            $image = Image::create([
                'name' => $validated['name'],
                'url' => $image_url,
                'alt_text' => $validated['alt_text'] ?? '',
                'width' => $validated['width'],
                'height' => $validated['height'],
                'priority' => $validated['priority'],
            ]);

            Log::info('Image record created successfully in the database.', [
                'image_id' => $image->id,
                'user_id' => auth()->id(),
            ]);
            session()->flash('flash', [
                'message' => 'Image Inserted successfully.',
                'type' => 'success',
            ]);

            return redirect()->route('images.index');
        } catch (\Exception $e) {
            Log::error('Error uploading image.', [
                'error_message' => $e->getMessage(),
                'user_id' => auth()->id(),
                'stack_trace' => $e->getTraceAsString(),
            ]);
            session()->flash('flash', [
                'message' => 'Image Upload Failed.',
                'type' => 'success',
            ]);

            return redirect()->route('images.create');
        }
    }

    public function delete(Request $request, string $imageId)
    {
        $user = Auth::user();

        if ($user->roles()->first()->name !== 'admin') {
            abort(403, 'You do not have permission to delete images.');
        }

        $image = Image::find($imageId);

        if (! $image) {
            session()->flash('flash', [
                'message' => 'Image not found!',
                'type' => 'error',
            ]);
            return redirect()->route('images.index');
        }

        $image->delete();

        session()->flash('flash', [
            'message' => 'Image deleted successfully.',
            'type' => 'success',
        ]);

        return redirect()->route('images.index');
    }

}
