# Generated by Django 5.1.4 on 2025-01-02 13:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0011_customuser_user_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_score',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(5, 'امتیاز نمیتواند بیشتر از 5 باشد'), django.core.validators.MinValueValidator(0, 'امتیاز نمیتواند کمتر از 0 باشد')]),
        ),
    ]
