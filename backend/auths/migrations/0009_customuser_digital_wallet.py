# Generated by Django 5.1.4 on 2025-01-01 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0008_customuser_intro_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='digital_wallet',
            field=models.IntegerField(default=0, verbose_name='کیف پول دیجیتال'),
        ),
    ]
