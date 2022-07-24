import sqlite3
import pathlib

total = 0

def run_query(file_path: pathlib.Path) -> None:
    con = sqlite3.connect(file_path)
    cur = con.cursor()

    for row in cur.execute("SELECT COUNT(1) FROM player_score"):
        print(row[0], file_path)
        global total
        total += row[0]

    con.commit()
    con.close()
    

def run() -> None:
    for path in pathlib.Path("initial_data").glob("*.db"):
        run_query(path)
    global total
    print(total, "total")


if __name__ == '__main__':
    """
    実行するとこんな感じの結果が得られる。1が大人気。

    ❯ python initial_summery.py | sort -nr | head
    3725307 total
    1674797 initial_data/1.db
    57142 initial_data/45.db
    55368 initial_data/19.db
    54907 initial_data/14.db
    54827 initial_data/26.db
    51110 initial_data/36.db
    49886 initial_data/94.db
    49522 initial_data/96.db
    47738 initial_data/79.db
   """
    run()