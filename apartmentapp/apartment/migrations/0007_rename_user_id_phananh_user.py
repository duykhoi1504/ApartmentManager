# Generated by Django 5.0.4 on 2024-05-06 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0006_phananh_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='phananh',
            old_name='user_id',
            new_name='user',
        ),
    ]
