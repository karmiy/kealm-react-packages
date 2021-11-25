import { StyleSheet, TextStyle } from 'react-native';
import { BasicTheme } from './theme';

// 注：规定变量名
// 文本 text_color
// 背景 background_color
// 边框 border_color

// Text
const withTextTheme = (basicTheme: BasicTheme) => ({
    c_text_font_size: basicTheme.font_size_M,
    c_text_color: basicTheme.color_text_primary,
});

// Badge
const withBadgeTheme = (basicTheme: BasicTheme) => ({
    c_badge_color: basicTheme.color_mark,
    c_badge_rect: 16,
    c_badge_dot_rect: 8,
    c_badge_padding_horizontal: 4,
    c_badge_text_color: basicTheme.color_white,
    c_badge_font_size: basicTheme.font_size_XS,
});

// Button
const withButtonTheme = (basicTheme: BasicTheme) => ({
    // size
    c_button_height_default: 28,
    c_button_radius_default: 15,
    c_button_padding_horizontal_default: 12,
    c_button_font_size: basicTheme.font_size_M,
    c_button_height_large: 48,
    c_button_radius_large: 24,
    c_button_padding_horizontal_large: 28,
    c_button_font_size_large: basicTheme.font_size_XXXL,
    // plain
    c_button_plain_background_color: basicTheme.color_white,
    // color
    c_button_primary_color: basicTheme.color_primary,
    c_button_regular_color: basicTheme.color_regular,
    c_button_info_color: basicTheme.color_info,
    // disabled
    c_button_disabled_background_color: basicTheme.disabled_background,
    c_button_disabled_text_color: basicTheme.color_white,
    c_button_plain_disabled_border_color: basicTheme.disabled_background,
    c_button_plain_disabled_background_color: basicTheme.color_white,
    c_button_plain_disabled_text_color: basicTheme.disabled_text_color,
});

// Input
const withInputTheme = (basicTheme: BasicTheme) => ({
    c_input_height_default: 36,
    c_input_padding_horizontal_default: 14,
    c_input_radius_default: 18,
    c_input_font_size_default: basicTheme.font_size_L,
    c_input_label_gap: 8,
    c_input_clear_gap: 8,
    // size
    c_input_height_large: 48,
    c_input_padding_horizontal_large: 16,
    c_input_radius_large: 24,
    c_input_font_size_large: basicTheme.font_size_XXL,
    // input
    c_input_background_color: basicTheme.color_white,
    c_input_background_color_grey: basicTheme.background_color_light,
    c_input_text_color: basicTheme.color_text_primary,
    c_input_placeholder_color: basicTheme.color_text_placeholder,
    // disabled
    c_input_disabled_color: basicTheme.disabled_text_color,
    c_input_disabled_placeholder_color: basicTheme.disabled_text_color,
    // clear
    c_input_clear_btn_rect: 16,
});

// Textarea
const withTextareaTheme = (basicTheme: BasicTheme) => ({
    // size
    c_textarea_radius_default: 8,
    c_textarea_radius_medium: 8,
    c_textarea_font_size_default: basicTheme.font_size_M,
    c_textarea_font_size_medium: basicTheme.font_size_XL,
    // textarea
    c_textarea_text_color: basicTheme.color_text_primary,
    c_textarea_placeholder_color: basicTheme.color_text_placeholder,
    c_textarea_padding_vertical: 12,
    c_textarea_padding_horizontal: 16,
    c_textarea_background_color_grey: basicTheme.background_color_light,
    // disabled
    c_textarea_disabled_color: basicTheme.disabled_text_color,
    c_textarea_disabled_placeholder_color: basicTheme.disabled_text_color,
    // count
    c_textarea_count_height: 24,
    c_textarea_count_font_size: basicTheme.font_size_XL,
    c_textarea_count_text_color: basicTheme.color_text_secondary,
    // tags
    c_textarea_tags_gap: 12,
    c_textarea_tags_height: 28,
    c_textarea_tags_padding_horizontal: 6,
    c_textarea_tags_border_width: 1,
    c_textarea_tags_border_color: basicTheme.background_color_dark,
    c_textarea_tags_radius: 15,
    c_textarea_tags_add_icon_rect: 12,
    c_textarea_tags_add_icon_gap: 4,
    c_textarea_tags_font_size: basicTheme.font_size_XS,
});

// Pop
const withPopTheme = (basicTheme: BasicTheme) => ({
    c_pop_z_index: basicTheme.z_index_XL,
    c_pop_mask_background_color: basicTheme.color_text_thin_dark_4,
});

// Drawer
const withDrawerTheme = (basicTheme: BasicTheme) => ({
    c_drawer_wrapper_z_index: basicTheme.z_index_M,
});

// Dialog
const withDialogTheme = (basicTheme: BasicTheme) => ({
    c_dialog_width: 270,
    c_dialog_radius: 12,
    c_dialog_background_color: basicTheme.color_white,
    c_dialog_body_padding_horizontal: 15,
    c_dialog_body_min_height_without_title: 80,
    c_dialog_title_margin_top: 20,
    c_dialog_title_margin_bottom: 8,
    c_dialog_title_line_height: 24,
    c_dialog_title_font_size: basicTheme.font_size_XXXL,
    c_dialog_title_font_weight: 'bold' as TextStyle['fontWeight'],
    c_dialog_content_line_height: 20,
    c_dialog_content_margin_bottom: 20,
    c_dialog_content_font_size: basicTheme.font_size_M,
    c_dialog_content_letter_spacing: 0.29,
    c_dialog_content_margin_vertical_without_title: 20,
    c_dialog_footer_height: 50,
    c_dialog_footer_border_width: StyleSheet.hairlineWidth,
    c_dialog_footer_border_color: basicTheme.border_color_base,
    c_dialog_footer_font_size: basicTheme.font_size_XXXL,
    c_dialog_footer_text_color: basicTheme.color_text_regular,
    c_dialog_footer_ok_text_color: basicTheme.color_primary,
});

// ActionSheet
const withActionSheetTheme = (basicTheme: BasicTheme) => ({
    c_action_sheet_radius: 12,
    c_action_sheet_background_color: basicTheme.color_white,
    c_action_sheet_border_color: basicTheme.border_color_base,
    c_action_sheet_title_padding_vertical: 15,
    c_action_sheet_title_padding_horizontal: 16,
    c_action_sheet_title_line_height: 18,
    c_action_sheet_title_font_size: basicTheme.font_size_S,
    c_action_sheet_title_text_color: basicTheme.color_text_regular,
    c_action_sheet_action_line_height: 25,
    c_action_sheet_action_padding_vertical: 12,
    c_action_sheet_action_padding_horizontal: 16,
    c_action_sheet_action_font_size: basicTheme.font_size_XXXL,
    c_action_sheet_disabled_text_color: basicTheme.disabled_text_color, // TODO
    c_action_sheet_space_height: 8,
    c_action_sheet_space_background_color: basicTheme.background_color_base,
});

// Toast
const withToastTheme = (basicTheme: BasicTheme) => ({
    c_toast_background_color: basicTheme.color_text_thin_dark_6,
    c_toast_radius: 8,
    c_toast_padding_horizontal: 8,
    c_toast_padding_vertical: 8,
    c_toast_padding_horizontal_with_icon: 9,
    c_toast_padding_vertical_with_icon: 20,
    c_toast_icon_rect: 54,
    c_toast_content_width_with_icon: 102,
    c_toast_content_padding_top_with_icon: 11,
    c_toast_font_size: basicTheme.font_size_M,
    c_toast_font_size_with_icon: basicTheme.font_size_M,
    c_toast_text_color: basicTheme.color_white,
});

// PickerView
const withPickerViewTheme = (basicTheme: BasicTheme) => ({
    c_picker_view_item_height: 34,
    c_picker_view_item_grandient_top: ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.5)'],
    c_picker_view_item_grandient_bottom: ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.95)'],
    c_picker_view_background_color: basicTheme.color_white,
    c_picker_view_font_size: basicTheme.font_size_XXXXL,
    c_picker_view_text_color: basicTheme.color_text_primary,
    c_picker_view_indicator_border_color: basicTheme.border_color_dark,
});

// Picker
const withPickerTheme = (basicTheme: BasicTheme) => ({
    c_picker_radius: 12,
    c_picker_background_color: basicTheme.color_white,
    c_picker_header_height: 44,
    c_picker_header_border_color: basicTheme.border_color_base,
    c_picker_title_height: 44,
    c_picker_title_font_size: basicTheme.font_size_XL,
    c_picker_title_text_color: basicTheme.color_text_primary,
    c_picker_btn_height: 44,
    c_picker_btn_padding_horizontal: 16,
    c_picker_btn_font_size: basicTheme.font_size_XL,
    c_picker_btn_text_color: basicTheme.color_text_primary,
    c_picker_btn_ok_text_color: basicTheme.color_primary,
    c_picker_view_padding_vertical: 16,
});

// DatePicker
const withDatePickerTheme = (basicTheme: BasicTheme) => ({
    c_date_picker_radius: 12,
    c_date_picker_background_color: basicTheme.color_white,
    c_date_picker_header_height: 44,
    c_date_picker_header_border_color: basicTheme.border_color_base,
    c_date_picker_title_height: 44,
    c_date_picker_title_font_size: basicTheme.font_size_XL,
    c_date_picker_title_text_color: basicTheme.color_text_primary,
    c_date_picker_btn_height: 44,
    c_date_picker_btn_padding_horizontal: 16,
    c_date_picker_btn_font_size: basicTheme.font_size_XL,
    c_date_picker_btn_text_color: basicTheme.color_text_primary,
    c_date_picker_btn_ok_text_color: basicTheme.color_primary,
    c_date_picker_view_padding_vertical: 16,
});

// Stepper
const withStepperTheme = (basicTheme: BasicTheme) => ({
    // size
    c_stepper_width: 108,
    c_stepper_height: 32,
    c_stepper_background_color: basicTheme.color_white,
    c_stepper_border_width: StyleSheet.hairlineWidth,
    c_stepper_border_color: basicTheme.border_color_base,
    c_stepper_radius: 16,
    c_stepper_plain_font_size: basicTheme.font_size_L,
});

export const withComponentsTheme = (basicTheme: BasicTheme) => ({
    ...withTextTheme(basicTheme),
    ...withBadgeTheme(basicTheme),
    ...withButtonTheme(basicTheme),
    ...withInputTheme(basicTheme),
    ...withTextareaTheme(basicTheme),
    ...withPopTheme(basicTheme),
    ...withDrawerTheme(basicTheme),
    ...withDialogTheme(basicTheme),
    ...withActionSheetTheme(basicTheme),
    ...withToastTheme(basicTheme),
    ...withPickerViewTheme(basicTheme),
    ...withPickerTheme(basicTheme),
    ...withDatePickerTheme(basicTheme),
    ...withStepperTheme(basicTheme),
});

export type ComponentsTheme = ReturnType<typeof withComponentsTheme>;
