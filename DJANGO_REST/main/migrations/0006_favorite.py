# Generated by Django 4.0.4 on 2022-05-04 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_movies_poster'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('poster', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=30)),
            ],
        ),
    ]
