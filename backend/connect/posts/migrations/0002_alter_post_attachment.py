# Generated by Django 5.0.6 on 2024-06-20 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='attachment',
            field=models.ImageField(blank=True, null=True, upload_to='post_images/'),
        ),
    ]
