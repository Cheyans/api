import pymysql

connection = None


def init_db(config):
    global connection
    connection = pymysql.connect(**config['DATABASE'])
