import { ResolvableTarget } from '../../_utils/dom';

export interface PortalProps {
    visible?: boolean;
    getContainer?: ResolvableTarget<Element>;
}
