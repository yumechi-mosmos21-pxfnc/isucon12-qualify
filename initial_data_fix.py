import sqlite3
import pathlib

def run_query(file_path: pathlib.Path) -> None:
    con = sqlite3.connect(file_path)
    cur = con.cursor()

    # add index
    cur.execute("CREATE INDEX IF NOT EXISTS `competition_tenant_id_idx` ON competition (`tenant_id`);")
    cur.execute("CREATE INDEX IF NOT EXISTS `player_tenant_id_idx` ON player (`tenant_id`);")
    cur.execute("CREATE INDEX IF NOT EXISTS `score_idx` ON player_score (`tenant_id`, `competition_id`, `player_id`);")

    # add 設定
    cur.execute("PRAGMA journal_mode = WAL;")
    cur.execute("PRAGMA synchronous  = NORMAL;")

    con.commit()
    con.close()
    

def run() -> None:
    for path in pathlib.Path("initial_data").glob("*.db"):
        run_query(path)


if __name__ == '__main__':
    run()