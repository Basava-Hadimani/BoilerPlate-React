var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classnames from 'classnames';
//
// import _ from './utils'

var defaultButton = function defaultButton(props) {
  return React.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

var ReactTablePagination = function (_Component) {
  _inherits(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    _classCallCheck(this, ReactTablePagination);

    var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this));

    _this.getSafePage = _this.getSafePage.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.applyPage = _this.applyPage.bind(_this);

    _this.state = {
      page: props.page
    };
    return _this;
  }

  _createClass(ReactTablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ page: nextProps.page });
    }
  }, {
    key: 'getSafePage',
    value: function getSafePage(page) {
      if (isNaN(page)) {
        page = this.props.page;
      }
      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({ page: page });
      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: 'applyPage',
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }
      var page = this.state.page;
      this.changePage(page === '' ? this.props.page : page);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pages = _props.pages,
          page = _props.page,
          showPageSizeOptions = _props.showPageSizeOptions,
          pageSizeOptions = _props.pageSizeOptions,
          pageSize = _props.pageSize,
          showPageJump = _props.showPageJump,
          canPrevious = _props.canPrevious,
          canNext = _props.canNext,
          onPageSizeChange = _props.onPageSizeChange,
          className = _props.className,
          _props$PreviousCompon = _props.PreviousComponent,
          PreviousComponent = _props$PreviousCompon === undefined ? defaultButton : _props$PreviousCompon,
          _props$NextComponent = _props.NextComponent,
          NextComponent = _props$NextComponent === undefined ? defaultButton : _props$NextComponent;


      return React.createElement(
        'div',
        {
          className: classnames(className, '-pagination'),
          style: this.props.style
        },
        React.createElement(
          'div',
          { className: '-previous' },
          React.createElement(
            PreviousComponent,
            {
              onClick: function onClick() {
                if (!canPrevious) return;
                _this2.changePage(page - 1);
              },
              disabled: !canPrevious
            },
            this.props.previousText
          )
        ),
        React.createElement(
          'div',
          { className: '-center' },
          React.createElement(
            'span',
            { className: '-pageInfo' },
            this.props.pageText,
            ' ',
            showPageJump ? React.createElement(
              'div',
              { className: '-pageJump' },
              React.createElement('input', {
                type: this.state.page === '' ? 'text' : 'number',
                onChange: function onChange(e) {
                  var val = e.target.value;
                  var page = val - 1;
                  if (val === '') {
                    return _this2.setState({ page: val });
                  }
                  _this2.setState({ page: _this2.getSafePage(page) });
                },
                value: this.state.page === '' ? '' : this.state.page + 1,
                onBlur: this.applyPage,
                onKeyPress: function onKeyPress(e) {
                  if (e.which === 13 || e.keyCode === 13) {
                    _this2.applyPage();
                  }
                }
              })
            ) : React.createElement(
              'span',
              { className: '-currentPage' },
              page + 1
            ),
            ' ',
            this.props.ofText,
            ' ',
            React.createElement(
              'span',
              { className: '-totalPages' },
              pages || 1
            )
          ),
          showPageSizeOptions && React.createElement(
            'span',
            { className: 'select-wrap -pageSizeOptions' },
            React.createElement(
              'select',
              {
                onChange: function onChange(e) {
                  return onPageSizeChange(Number(e.target.value));
                },
                value: pageSize
              },
              pageSizeOptions.map(function (option, i) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  React.createElement(
                    'option',
                    { key: i, value: option },
                    option,
                    ' ',
                    _this2.props.rowsText
                  )
                );
              })
            )
          )
        ),
        React.createElement(
          'div',
          { className: '-next' },
          React.createElement(
            NextComponent,
            {
              onClick: function onClick() {
                if (!canNext) return;
                _this2.changePage(page + 1);
              },
              disabled: !canNext
            },
            this.props.nextText
          )
        )
      );
    }
  }]);

  return ReactTablePagination;
}(Component);

export default ReactTablePagination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiY2xhc3NuYW1lcyIsImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiUmVhY3RUYWJsZVBhZ2luYXRpb24iLCJnZXRTYWZlUGFnZSIsImJpbmQiLCJjaGFuZ2VQYWdlIiwiYXBwbHlQYWdlIiwic3RhdGUiLCJwYWdlIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJpc05hTiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlcyIsIm9uUGFnZUNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZSIsInNob3dQYWdlSnVtcCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsIm9uUGFnZVNpemVDaGFuZ2UiLCJjbGFzc05hbWUiLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJzdHlsZSIsInByZXZpb3VzVGV4dCIsInBhZ2VUZXh0IiwidmFsIiwidGFyZ2V0IiwidmFsdWUiLCJ3aGljaCIsImtleUNvZGUiLCJvZlRleHQiLCJOdW1iZXIiLCJtYXAiLCJvcHRpb24iLCJpIiwicm93c1RleHQiLCJuZXh0VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFNBQ3BCO0FBQUE7QUFBQSxlQUFRLE1BQUssUUFBYixJQUEwQkMsS0FBMUIsSUFBaUMsV0FBVSxNQUEzQztBQUNHQSxVQUFNQztBQURULEdBRG9CO0FBQUEsQ0FBdEI7O0lBTXFCQyxvQjs7O0FBQ25CLGdDQUFhRixLQUFiLEVBQW9CO0FBQUE7O0FBQUE7O0FBR2xCLFVBQUtHLFdBQUwsR0FBbUIs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S0FBS0EsQ0FBYixFQUFnQixPQUFPRCxNQUF2QjtBQUNHQSwwQkFESDtBQUFBO0FBQ1ksMkJBQUt4QyxLQUFMLENBQVcwQztBQUR2QjtBQUZtQjtBQUFBLGVBQXBCO0FBSkg7QUFERjtBQS9CSixTQWZGO0FBNERFO0FBQUE7QUFBQSxZQUFLLFdBQVUsT0FBZjtBQUNFO0FBQUMseUJBQUQ7QUFBQTtBQUNFLHVCQUFTLG1CQUFNO0FBQ2Isb0JBQUksQ0FBQ2xCLE9BQUwsRUFBYztBQUNkLHVCQUFLbkIsVUFBTCxDQUFnQkcsT0FBTyxDQUF2QjtBQUNELGVBSkg7QUFLRSx3QkFBVSxDQUFDZ0I7QUFMYjtBQU9HLGlCQUFLeEIsS0FBTCxDQUFXMkM7QUFQZDtBQURGO0FBNURGLE9BREY7QUEwRUQ7Ozs7RUFsSStDOUMsUzs7ZUFBN0JLLG9CIiwiZmlsZSI6InBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbi8vIGltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IGRlZmF1bHRCdXR0b24gPSBwcm9wcyA9PiAoXG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwiLWJ0blwiPlxuICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWN0VGFibGVQYWdpbmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5nZXRTYWZlUGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuY2hhbmdlUGFnZSA9IHRoaXMuY2hhbmdlUGFnZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5hcHBseVBhZ2UgPSB0aGlzLmFwcGx5UGFnZS5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcGFnZTogcHJvcHMucGFnZSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFnZTogbmV4dFByb3BzLnBhZ2UgfSlcbiAgfVxuXG4gIGdldFNhZmVQYWdlIChwYWdlKSB7XG4gICAgaWYgKGlzTmFOKHBhZ2UpKSB7XG4gICAgICBwYWdlID0gdGhpcy5wcm9wcy5wYWdlXG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwYWdlLCAwKSwgdGhpcy5wcm9wcy5wYWdlcyAtIDEpXG4gIH1cblxuICBjaGFuZ2VQYWdlIChwYWdlKSB7XG4gICAgcGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSlcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFnZSB9KVxuICAgIGlmICh0aGlzLnByb3BzLnBhZ2UgIT09IHBhZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25QYWdlQ2hhbmdlKHBhZ2UpXG4gICAgfVxuICB9XG5cbiAgYXBwbHlQYWdlIChlKSB7XG4gICAgaWYgKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpIH1cbiAgICBjb25zdCBwYWdlID0gdGhpcy5zdGF0ZS5wYWdlXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgPT09ICcnID8gdGhpcy5wcm9wcy5wYWdlIDogcGFnZSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgLy8gQ29tcHV0ZWRcbiAgICAgIHBhZ2VzLFxuICAgICAgLy8gUHJvcHNcbiAgICAgIHBhZ2UsXG4gICAgICBzaG93UGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzaG93UGFnZUp1bXAsXG4gICAgICBjYW5QcmV2aW91cyxcbiAgICAgIGNhbk5leHQsXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgUHJldmlvdXNDb21wb25lbnQgPSBkZWZhdWx0QnV0dG9uLFxuICAgICAgTmV4dENvbXBvbmVudCA9IGRlZmF1bHRCdXR0b24sXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc05hbWUsICctcGFnaW5hdGlvbicpfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItcHJldmlvdXNcIj5cbiAgICAgICAgICA8UHJldmlvdXNDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjYW5QcmV2aW91cykgcmV0dXJuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlIC0gMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblByZXZpb3VzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZpb3VzVGV4dH1cbiAgICAgICAgICA8L1ByZXZpb3VzQ29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItY2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiLXBhZ2VJbmZvXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wYWdlVGV4dH17JyAnfVxuICAgICAgICAgICAge3Nob3dQYWdlSnVtcFxuICAgICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPVwiLXBhZ2VKdW1wXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJ3RleHQnIDogJ251bWJlcid9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB2YWwgLSAxXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoeyBwYWdlOiB2YWwgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFnZTogdGhpcy5nZXRTYWZlUGFnZShwYWdlKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJycgOiB0aGlzLnN0YXRlLnBhZ2UgKyAxfVxuICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmFwcGx5UGFnZX1cbiAgICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlQYWdlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgOiA8c3BhbiBjbGFzc05hbWU9XCItY3VycmVudFBhZ2VcIj5cbiAgICAgICAgICAgICAgICB7cGFnZSArIDF9XG4gICAgICAgICAgICAgIDwvc3Bhbj59eycgJ31cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm9mVGV4dH17JyAnfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiLXRvdGFsUGFnZXNcIj57cGFnZXMgfHwgMX08L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIHtzaG93UGFnZVNpemVPcHRpb25zICYmXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWxlY3Qtd3JhcCAtcGFnZVNpemVPcHRpb25zXCI+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBvblBhZ2VTaXplQ2hhbmdlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtwYWdlU2l6ZU9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IChcbiAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpfSB2YWx1ZT17b3B0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAge29wdGlvbn0ge3RoaXMucHJvcHMucm93c1RleHR9XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L3NwYW4+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItbmV4dFwiPlxuICAgICAgICAgIDxOZXh0Q29tcG9uZW50XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghY2FuTmV4dCkgcmV0dXJuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlICsgMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhbk5leHR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dFRleHR9XG4gICAgICAgICAgPC9OZXh0Q29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuIl19