# Generated by Django 4.1.4 on 2022-12-09 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_watch', '0002_alter_person_tmdb_id_alter_person_watchmode_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='imdb_id',
            field=models.CharField(max_length=25, null=True),
        ),
    ]
