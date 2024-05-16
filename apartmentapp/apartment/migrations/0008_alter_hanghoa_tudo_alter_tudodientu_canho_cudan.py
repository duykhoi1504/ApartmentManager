# Generated by Django 5.0.4 on 2024-05-15 15:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0007_remove_tudodientu_user_tudodientu_canho'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hanghoa',
            name='tuDo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hang_hoa', to='apartment.tudodientu'),
        ),
        migrations.AlterField(
            model_name='tudodientu',
            name='canho',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tu_do_dien_tu', to='apartment.canho'),
        ),
        migrations.CreateModel(
            name='CuDan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia_chi', models.CharField(max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
