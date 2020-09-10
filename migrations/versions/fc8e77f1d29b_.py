"""created initial tables

Revision ID: fc8e77f1d29b
Revises: e4a7c5df58f5
Create Date: 2019-07-15 18:48:04.073711

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fc8e77f1d29b'
down_revision = 'e4a7c5df58f5'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('event',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('event_title', sa.String(length=255), nullable=True),
                    sa.Column('num_judges', sa.Integer, nullable=True),
                    sa.Column('event_date', sa.Date, nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('performance',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('academic_level', sa.String(length=255), nullable=True),
                    sa.Column('choreographers', sa.ARRAY(sa.String(length=255)), nullable=True),
                    sa.Column('competition_level', sa.String(length=255), nullable=True),
                    sa.Column('dance_size', sa.String(length=255), nullable=True),
                    sa.Column('dance_entry', sa.Integer, nullable=True),
                    sa.Column('dance_style', sa.String(length=255), nullable=True),
                    sa.Column('dance_title', sa.String(length=255), nullable=True),
                    sa.Column('performers', sa.ARRAY(sa.String(length=255)), nullable=True),
                    sa.Column('school', sa.String(length=255), nullable=True),
                    sa.Column('event_id', sa.Integer, nullable=True),
                    sa.ForeignKeyConstraint(['event_id'], ['event.id']),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('adjudication',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('artistic_mark', sa.Integer, nullable=True),
                    sa.Column('audio_url', sa.String(length=255), nullable=True),
                    sa.Column('cumulative_mark', sa.Integer, nullable=True),
                    sa.Column('tablet_id', sa.Integer, nullable=True),
                    sa.Column('notes', sa.String(length=255), nullable=True),
                    sa.Column('special_award', sa.Boolean, nullable=True),
                    sa.Column('technical_mark', sa.Integer, nullable=True),
                    sa.Column('performance_id', sa.Integer, nullable=True),
                    sa.ForeignKeyConstraint(['performance_id'], ['performance.id']),
                    sa.PrimaryKeyConstraint('id')
                    )


def downgrade():
    op.drop_table('adjudication')
    op.drop_table('performance')
    op.drop_table('event')
