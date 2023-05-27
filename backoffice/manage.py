#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import cx_Oracle

def main():
    """Run administrative tasks."""
    #cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\Songmo_Kang\Desktop\DB\instantclient-basiclite-windows.x64-21.10.0.0.0dbru\instantclient_21_10")
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backoffice.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
