<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator',
                'email' => 'admin@wit.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'name' => 'Staff 1',
                'email' => 'staff1@wit.com',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
            [
                'name' => 'Staff 2',
                'email' => 'staff2@wit.com',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
            [
                'name' => 'Staff 3',
                'email' => 'staff3@wit.com',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
            [
                'name' => 'Staff 4',
                'email' => 'staff4@wit.com',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
