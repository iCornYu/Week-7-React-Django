# Generated by Django 3.2.6 on 2021-08-30 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_cart_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='username',
            new_name='user',
        ),
    ]