import classnames from "classnames";
import { htmlId } from "../api/js_utils";
import { DropDownItemProps, DropDownProps } from "../types";

/*
DropDown Bulma Component
trigger: a button
content: Array of a or div. must have class "dropdown-item"
*/
export const DropDown = ({
  hideOnLeave = true,
  trigger,
  contentWidth = "3em",
  contentHeight = "10em",
  ...props
}: DropDownProps): JSX.Element => {
  const { children } = props;
  const dropdownId = htmlId();
  return (
    <div
      id={dropdownId}
      className="dropdown"
      onMouseLeave={() => {
        if (hideOnLeave)
          document
            .querySelector("#" + dropdownId)!
            .classList.remove("is-active");
      }}
    >
      <div
        className="dropdown-trigger"
        onMouseDown={(e) => {
          e.preventDefault();
          document
            .querySelector("#" + dropdownId)!
            .classList.toggle("is-active");
        }}
      >
        {trigger}
      </div>
      <div className="dropdown-menu">
        <div
          className="dropdown-content has-text-centered"
          style={{
            width: contentWidth,
            height: contentHeight,
            overflowX: "hidden",
            overflowY: "auto",
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            document
              .querySelector("#" + dropdownId)!
              .classList.remove("is-active");
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const DropDownItem = ({
  onSelected,
  value,
  ...props
}: DropDownItemProps): JSX.Element => {
  const { className, children, ...rest } = props;
  return (
    <a
      className={classnames("dropdown-item", className)}
      onMouseDown={() => onSelected(value)}
      {...rest}
    >
      {children}
    </a>
  );
};
