# Generated by Django 5.1.4 on 2025-02-04 09:40

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_educationpeoject_class_session'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='educationpeoject',
            name='user',
        ),
        migrations.AddField(
            model_name='educationpeoject',
            name='time_line',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='educationpeoject',
            name='users',
            field=models.ManyToManyField(related_name='project_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='educationpeoject',
            name='type_class',
            field=models.CharField(choices=[('public', 'عمومی'), ('private', 'خصوصی')], default='public', max_length=50),
        ),
    ]
