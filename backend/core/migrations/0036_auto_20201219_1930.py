# Generated by Django 3.1.4 on 2020-12-19 19:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0035_auto_20201219_1927'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date_posted',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 19, 19, 30, 34, 935982)),
        ),
    ]
