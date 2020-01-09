# Resource Tool for Laravel Auditing

A Laravel Nova Resource Tool that allows you to easily display the audit log that is created by the [Laravel Auditing](http://www.laravel-auditing.com/) package (owen-it/laravel-auditing).

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
    
    // Shows audit log button on detail view, which expands audit trail
    AuditableLog::make()
  ];

}

```

![Audit Log within Laravel Nova Resource](https://raw.githubusercontent.com/dev-partners/laravel-nova-auditable-log/master/dist/audit-log-button.gif)