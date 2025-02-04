from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from ConsultHub.models import *

class SessionPayment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_METHODS = [
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
        ('wallet', 'Wallet'),
        ('bank_transfer', 'Bank Transfer'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name="User"
    )
    session = models.ForeignKey(
        ConsultSession,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='payments',
        verbose_name="Consult Session"
    )
    amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name="Payment Amount"
    )
    discount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00,
        verbose_name="Discount Applied"
    )
    total = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name="Total Amount"
    )
    method = models.CharField(
        max_length=50, 
        choices=PAYMENT_METHODS,
        verbose_name="Payment Method"
    )
    status = models.CharField(
        max_length=50, 
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name="Payment Status"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    transaction_id = models.CharField(
        max_length=100, 
        unique=True, 
        null=True, 
        blank=True,
        verbose_name="Transaction ID"
    )

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment {self.id} - {self.user} - {self.total} {self.status}"
