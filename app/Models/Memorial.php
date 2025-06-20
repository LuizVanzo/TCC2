<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Memorial extends Model
{
    protected $table = 'memorial';

    protected $primaryKey = 'cd_memorial';

    public static function membrosFamilia($cdFamilia, $cdMemorial)
    {
        $sql = <<<SQL
          SELECT * 
            FROM memorial m
			JOIN familia f on f.cd_familia = m.cd_familia
           WHERE m.cd_familia = :cdFamilia
             AND NOT m.cd_memorial = :cdMemorial
SQL;

        return DB::select($sql, ['cdFamilia' => $cdFamilia, 'cdMemorial' => $cdMemorial]);
    }
}
