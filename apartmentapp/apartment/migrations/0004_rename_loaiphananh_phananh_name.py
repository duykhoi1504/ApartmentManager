# Generated by Django 5.0.4 on 2024-05-06 04:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0003_phananh_loaiphananh'),
    ]

    operations = [
        migrations.RenameField(
            model_name='phananh',
            old_name='loaiPhanAnh',
            new_name='name',
        ),
    ]
