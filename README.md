# Resource Tool for Laravel Auditing

A Laravel Nova Resource Tool that allows you to easily display the audit log that is created by the Laravel Auditing package (owen-it/laravel-auditing).

## Installation

Simply install using composer.

```bash

composer require devpartners/auditable-log

```

Then add the resource tool to a resource whose related model uses and implements the Laravel Auditable package.

```php

public function fields(Request $request) 
{

  return [
    Text::make('Name'),
    Text::make('E-mail'),
    
    // Shows audit log on detail view
    AuditableLog::make('Audit Log')
  ];

}

```
