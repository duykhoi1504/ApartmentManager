# Generated by Django 5.0.4 on 2024-05-15 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0009_nguoithan_thegiuxe_delete_cudan'),
    ]

    operations = [
        migrations.RenameField(
            model_name='nguoithan',
            old_name='cmnd',
            new_name='cccd',
        ),
        migrations.RenameField(
            model_name='nguoithan',
            old_name='ten',
            new_name='name',
        ),
    ]
