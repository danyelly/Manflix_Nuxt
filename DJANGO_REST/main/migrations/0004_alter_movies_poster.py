# Generated by Django 4.0.4 on 2022-05-03 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_movies_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='poster',
            field=models.CharField(max_length=80),
        ),
    ]
