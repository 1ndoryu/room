<?php
// app/Models/AuthenticatedUser.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Connection;
use App\Database\MockGrammar; 
use App\Database\MockProcessor;
use App\Database\MockQueryBuilder;
use App\Database\MockEloquentBuilder;

class AuthenticatedUser extends Model implements Authenticatable
{
    use AuthenticatableTrait;

    protected $fillable = ['id', 'username', 'email'];
    public $timestamps = false;
    protected $table = 'authenticated_users';
    protected $rememberTokenName = 'remember_token';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->exists = true;
    }

    public function save(array $options = [])
    {
        return true;
    }


    public function update(array $attributes = [], array $options = [])
    {
        return true;
    }


    public function insert(array $attributes = [])
    {
        return true;
    }

    public function newInstance($attributes = [], $exists = false)
    {
        $model = parent::newInstance($attributes, $exists);
        $model->exists = true;
        return $model;
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function newQuery()
    {
        $connection = $this->createMockConnection();
        $grammar = $connection->getQueryGrammar();
        $processor = $connection->getPostProcessor();

        $queryBuilder = new MockQueryBuilder($connection, $grammar, $processor);
        $builder = new MockEloquentBuilder($queryBuilder);

        return $builder;
    }

    protected function createMockConnection()
    {
        $connection = new Connection(function () {});

        $connection->setQueryGrammar(new MockGrammar());
        $connection->setPostProcessor(new MockProcessor());

        return $connection;
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getRememberToken()
    {
        return session('remember_token', null);
    }

    public function setRememberToken($value)
    {
        session(['remember_token' => $value]);
    }

    public function getRememberTokenName()
    {
        return $this->rememberTokenName;
    }
}
