# Generated by Django 4.2.4 on 2023-09-07 04:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inventarioAPP', '0002_alter_documentocompra_fecha_registro'),
    ]

    operations = [
        migrations.CreateModel(
            name='articulosdeBaja',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('num_factura', models.CharField(blank=True, max_length=250)),
                ('serie_factura', models.CharField(blank=True, max_length=250)),
                ('motivo', models.CharField(max_length=250)),
                ('cantidad', models.IntegerField()),
                ('fecha_registro', models.DateField(auto_now_add=True)),
                ('cod_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventarioAPP.inventario')),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]