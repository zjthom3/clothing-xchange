# Generated by Django 3.1.4 on 2020-12-15 01:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='user',
            new_name='user_data',
        ),
    ]
