# Generated by Django 3.2.8 on 2021-10-25 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_consultant_dummy'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.JSONField()),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
