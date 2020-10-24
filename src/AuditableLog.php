<?php

namespace Devpartners\AuditableLog;

use Laravel\Nova\ResourceTool;
use Laravel\Nova\Http\Requests\NovaRequest;

class AuditableLog extends ResourceTool
{
    public function __construct()
    {
        parent::__construct();

        // Don't render the component if the user does not have access
        $this->canSee(function (NovaRequest $request) {
            if (!$request instanceof \Laravel\Nova\Http\Requests\ResourceDetailRequest) {
                return false;
            }

            return $request->user()->can('audit', $request->findModelOrFail());
        });
    }

    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return __('Auditable Log');
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'auditable-log';
    }
}
