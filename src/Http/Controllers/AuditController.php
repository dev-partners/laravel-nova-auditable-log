<?php

namespace Devpartners\AuditableLog\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Laravel\Nova\Nova;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Models\Audit;

class AuditController
{
    public function show(Request $request, $resourceName, $resourceId)
    {
        $record = $this->loadRecord($resourceName, $resourceId);

        $audits = $record->audits()->with('user')->orderBy('created_at', 'desc')->paginate();

        return response()->json(['status' => 'OK', 'audits' => $audits]);
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

        return $model::find($resourceId);
    }

    public function restore(Request $request, $resourceName, $resourceId, $auditId)
    {
        $record = $this->loadRecord($resourceName, $resourceId);

        /**
         * @var $auditor Audit
         * @var $audit   Audit
         */
        $auditableClass = Config::get('audit.implementation', Audit::class);
        $auditor = new $auditableClass;

        $audit = $record->audits()->where($auditor->getTable() . '.' . $auditor->getKeyName(), $auditId)->firstOrFail();

        $record->fill(Arr::only($audit->new_values, $request->input('restore', [])));
        $record->save();

        return response()->json(['status' => 'OK', 'record' => $record]);
    }
}
