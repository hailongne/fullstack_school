# Generated by Django 5.1 on 2024-09-09 04:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_class_classbyschool'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nameStudent', models.CharField(max_length=255)),
                ('mssv', models.CharField(max_length=255)),
                ('age', models.PositiveIntegerField()),
                ('hometown', models.CharField(max_length=255)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.classbyschool')),
                ('school_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.school')),
            ],
        ),
    ]
