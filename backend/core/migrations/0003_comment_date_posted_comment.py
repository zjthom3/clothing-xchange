# Generated by Django 3.1.4 on 2020-12-14 19:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20201214_1930'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='date_posted_comment',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]