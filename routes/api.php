<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. You're free to add
| as many additional routes to this file as your tool may require.
|
*/

Route::get('/audits/{resourceName}/{resourceId}', function (Request $request, $resourceName, $resourceId) {
    $model = \Laravel\Nova\Nova::modelInstanceForKey($resourceName);
    $record = $model::find($resourceId);

    $audits = $record->audits()->with('user')->orderBy('created_at', 'desc')->paginate();

    return response()->json(['status' => 'OK', 'audits' => $audits]);
});
