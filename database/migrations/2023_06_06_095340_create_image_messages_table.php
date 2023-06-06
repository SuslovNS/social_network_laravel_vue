<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_messages', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->foreignId('message_id')->unsigned()->index()->nullable()->constrained('messages');
            $table->foreignId('user_id')->unsigned()->index()->nullable()->constrained('users');
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('image_messages');
    }
};
