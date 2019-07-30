"""empty message

Revision ID: 0c66ca773c8e
Revises: fc8e77f1d29b
Create Date: 2019-07-17 19:16:15.109297

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c66ca773c8e'
# down_revision = 'fc8e77f1d29b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('award',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('winning_performance_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['winning_performance_id'], ['performance.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('award_performance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('award_id', sa.Integer(), nullable=True),
    sa.Column('performance_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['award_id'], ['award.id'], ),
    sa.ForeignKeyConstraint(['performance_id'], ['performance.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('nomination_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('adjudication_id', sa.Integer(), nullable=True),
    sa.Column('award_id', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['adjudication_id'], ['adjudication.id'], ),
    sa.ForeignKeyConstraint(['award_id'], ['award.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nomination_comments')
    op.drop_table('award_performance')
    op.drop_table('award')
    # ### end Alembic commands ###
