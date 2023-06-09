# Generated by Django 3.2.18 on 2023-05-07 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('movie_no', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=50, null=True)),
                ('running_time', models.BigIntegerField(blank=True, null=True)),
                ('descriptions', models.CharField(blank=True, max_length=150, null=True)),
                ('genre', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'MOVIE',
                'managed': False,
            },
        ),
    ]
