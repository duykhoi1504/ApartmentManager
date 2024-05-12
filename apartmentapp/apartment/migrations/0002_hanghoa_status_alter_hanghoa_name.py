# Generated by Django 5.0.4 on 2024-05-12 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hanghoa',
            name='status',
            field=models.CharField(choices=[('waiting', 'Chờ nhận hàng'), ('received', 'Đã nhận hàng')], default='waiting', max_length=20),
        ),
        migrations.AlterField(
            model_name='hanghoa',
            name='name',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
