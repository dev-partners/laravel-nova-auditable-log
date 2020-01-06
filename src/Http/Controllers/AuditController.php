<?php

namespace Devpartners\AuditableLog\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Nova\Nova;

class AuditController
{
    public function show(Request $request, $resourceName, $resourceId)
    {
        $model = Nova::modelInstanceForKey($resourceName);
        $record = $model::find($resourceId);

        $audits = $record->audits()->with('user')->orderBy('created_at', 'desc')->paginate();

        return response()->json(['status' => 'OK', 'audits' => $audits]);
    }
}
