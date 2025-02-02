<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * 
 *
 * @property-read \App\Models\TFactory|null $use_factory
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Audio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Audio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Audio query()
 * @mixin \Eloquent
 */
class Audio extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'url', 'duration', 'bitrate', 'description', 'priority'];
}
