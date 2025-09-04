<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin WIT',
            'email' => 'admin@wit.id',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        // Create default staff user
        User::create([
            'name' => 'Staff WIT',
            'email' => 'staff@wit.id',
            'password' => Hash::make('password123'),
            'role' => 'staff',
        ]);
    }
}