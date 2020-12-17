# Generated by Django 3.1.4 on 2020-12-15 19:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0012_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='user_data',
        ),
        migrations.AddField(
            model_name='post',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='auth.user'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='UserData',
        ),
    ]