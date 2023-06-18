# Generated by Django 3.2.18 on 2023-06-07 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20230521_1107'),
    ]

    operations = [
        migrations.CreateModel(
            name='DetailCode',
            fields=[
                ('detail_code_no', models.CharField(max_length=7, primary_key=True, serialize=False)),
                ('detail_code_nm', models.CharField(max_length=30)),
                ('code_no', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'detail_code',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='CusGrade',
        ),
        migrations.DeleteModel(
            name='Genre',
        ),
        migrations.DeleteModel(
            name='MovGrade',
        ),
        migrations.DeleteModel(
            name='PaymentMethod',
        ),
        migrations.DeleteModel(
            name='SeatGrade',
        ),
    ]
