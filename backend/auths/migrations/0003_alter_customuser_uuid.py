# Generated by Django 5.1.3 on 2024-12-06 16:53

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0002_customuser_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, verbose_name='شناسه یکتا'),
        ),
    ]