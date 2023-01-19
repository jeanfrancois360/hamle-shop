import React from 'react';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import OrderDetails from './OrderDetails';
import { closeDetailsView } from '../../redux/action/detailsViewAction';

const DetailsView = ({ detailsView, closeDetailsView }) => {
  return (
    <>
      <Modal open={detailsView ? true : false} onClose={closeDetailsView}>
        {detailsView && (
          <div className="detail_view">
            <OrderDetails items={detailsView} />
          </div>
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  detailsView: state.detailsView,
});

export default connect(mapStateToProps, { closeDetailsView })(DetailsView);
