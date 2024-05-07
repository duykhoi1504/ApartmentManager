# Generated by Django 5.0.4 on 2024-05-07 07:21

import ckeditor.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartment', '0018_phieukhaosat_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='phieukhaosat',
            old_name='name',
            new_name='tieuDe',
        ),
        migrations.RemoveField(
            model_name='phieukhaosat',
            name='noiDung',
        ),
        migrations.RemoveField(
            model_name='phieukhaosat',
            name='user',
        ),
        migrations.CreateModel(
            name='CauHoiKhaoSat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('cauHoi', ckeditor.fields.RichTextField()),
                ('phieukhaosat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apartment.phieukhaosat')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DapAnKhaoSat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('dapAn', ckeditor.fields.RichTextField()),
                ('cauhoikhaosat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apartment.cauhoikhaosat')),
                ('phieukhaosat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='apartment.phieukhaosat')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='phieukhaosat',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]