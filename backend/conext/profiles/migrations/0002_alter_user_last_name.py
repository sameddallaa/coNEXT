# Generated by Django 5.0.6 on 2024-06-20 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(default='', max_length=255, verbose_name='Last Name'),
        ),
    ]
