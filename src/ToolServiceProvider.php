<?php

namespace Devpartners\AuditableLog;

use Laravel\Nova\Nova;
use Illuminate\Support\Facades\Gate;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ToolServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        $this->app->booted(function () {
            $this->routes();

            // By default logged in users can audit and restore
            Gate::define('audit', function ($user, $resource) {
                return true;
            });
            Gate::define('audit_restore', function ($user, $resource) {
                return true;
            });
        });

        Nova::serving(function (ServingNova $event) {
            Nova::script('auditable-log', __DIR__ . '/../dist/js/tool.js');
            Nova::style('auditable-log', __DIR__ . '/../dist/css/tool.css');

            Nova::translations([
                'Audit Log' => __('Audit Log'),
                //'User' => __('User'),
                'Event' => __('Event'),
                'Date/Time' => __('Date/Time'),
                'Old Values' => __('Old Values'),
                'New Values' => __('New Values'),
                'console' => __('console'),
                'Previous' => __('Previous'),
                'Next' => __('Next'),
                'View Audit Log' => __('View Audit Log'),
                'Restore audit' => __('Restore audit'),
                'Field' => __('Field'),
                'Current' => __('Current'),
                'Restore to' => __('Restore to'),
                'No changes' => __('No changes'),
                'Cancel' => __('Cancel'),
                'Restore' => __('Restore'),
            ]);
        });
    }

    /**
     * Register any application services.
     */
    public function register()
    {
    }

    /**
     * Register the tool's routes.
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova'])
            ->prefix('nova-vendor/auditable-log')
            ->group(__DIR__ . '/../routes/api.php');
    }
}
