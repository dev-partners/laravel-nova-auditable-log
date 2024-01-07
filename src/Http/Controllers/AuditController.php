<?php

namespace Devpartners\AuditableLog\Http\Controllers;

use Laravel\Nova\Nova;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class AuditController
{
    public function show(Request $request, $resourceName, $resourceId)
    {
        $record = $this->loadRecord($resourceName, $resourceId);
        $user = $request->user(config('nova.guard'));

        abort_if($user->cant('audit', $record), 403, 'Unable to retrieve audits');

        $audits = $record->audits()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate();

        return response()->json(['status' => 'OK', 'audits' => $audits, 'restore' => $user->can('audit_restore', $record)]);
    }

    public function restore(Request $request, $resourceName, $resourceId, $auditId)
    {
        $record = $this->loadRecord($resourceName, $resourceId);
        $user = $request->user(config('nova.guard'));

        abort_if($user->cant('audit_restore', $record), 403, 'Unable to restore audits');

        /**
         * @var Audit $auditor
         * @var Audit $audit
         */
        $auditableClass = Config::get('audit.implementation', Audit::class);
        $auditor = new $auditableClass();

        $audit = $record->audits()->where($auditor->getTable() . '.' . $auditor->getKeyName(), $auditId)->firstOrFail();

        $record->fill(Arr::only($audit->new_values, $request->input('restore', [])));
        $record->save();

        return response()->json(['status' => 'OK', 'record' => $record]);
    }

    /**
     * @param $resourceName
     * @param $resourceId
     *
     * @return Auditable|Model
     */
    protected function loadRecord($resourceName, $resourceId)
    {
        $model = Nova::modelInstanceForKey($resourceName);

        return $model->withoutGlobalScopes()->find($resourceId);
    }
}
