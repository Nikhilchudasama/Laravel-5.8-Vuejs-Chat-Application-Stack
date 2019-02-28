<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //get messages
    public function getMessages()
    {
        $messages = Message::all();
        return response()->json($messages, 200);
    }

    //send messages
    public function sendMessage(Request $request)
    {
        $data = $request->only(['name','body']);
        $message = Message::create($data);
        return response()->json($message, 200);
    }
}
