# Generated by Django 3.1.4 on 2020-12-18 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_delete_customuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddres',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.TextField(max_length=200)),
                ('city', models.TextField(max_length=200)),
                ('state_prov', models.TextField(max_length=200)),
                ('zipcode', models.TextField(max_length=200)),
            ],
        ),
    ]
